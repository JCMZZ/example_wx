package com.emay.estore.dto.system.auth;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.emay.estore.pojo.system.AuthOper;
import com.emay.estore.pojo.system.AuthPage;
import com.emay.estore.pojo.system.Navigation;

public class AuthTree implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<NgvigationDTO> ngvs = new ArrayList<NgvigationDTO>();

	public AuthTree() {

	}

	public AuthTree(List<AuthOper> opers, List<AuthPage> pages, List<Navigation> navigations) {

		Map<Long, List<OperDTO>> operdtos = new LinkedHashMap<Long, List<OperDTO>>();
		if (opers != null) {
			for (AuthOper oper : opers) {
				OperDTO operdto = new OperDTO(oper);
				if (operdtos.containsKey(oper.getPageAuthId())) {
					operdtos.get(oper.getPageAuthId()).add(operdto);
				} else {
					List<OperDTO> list = new ArrayList<OperDTO>();
					list.add(operdto);
					operdtos.put(oper.getPageAuthId(), list);
				}
			}
		}

		Map<Long, List<PageDTO>> pagedtos = new LinkedHashMap<Long, List<PageDTO>>();
		if (pages != null) {
			for (AuthPage page : pages) {
				PageDTO pagedto = new PageDTO(page);
				pagedto.setOpers(operdtos.get(page.getId()));
				if (pagedtos.containsKey(page.getNavigationId())) {
					pagedtos.get(page.getNavigationId()).add(pagedto);
				} else {
					List<PageDTO> list = new ArrayList<PageDTO>();
					list.add(pagedto);
					pagedtos.put(page.getNavigationId(), list);
				}
			}
		}

		List<NgvigationDTO> ngvdtos = new ArrayList<NgvigationDTO>();
		if (navigations != null) {
			for (Navigation navigation : navigations) {
				NgvigationDTO dto = new NgvigationDTO(navigation);
				List<PageDTO> pagesInNav = pagedtos.get(navigation.getId());
				if (pagesInNav != null) {
					dto.setPages(pagesInNav);
					ngvdtos.add(dto);
				}
			}
		}
		this.ngvs = ngvdtos;
	}

	public List<NgvigationDTO> getNgvs() {
		return ngvs;
	}

	public void setNgvs(List<NgvigationDTO> ngvs) {
		this.ngvs = ngvs;
	}

	public PageDTO findPage(long pageId) {
		for (NgvigationDTO nav : ngvs) {
			for (PageDTO page : nav.getPages()) {
				if (page.getId() == pageId) {
					return page;
				}
			}
		}
		return null;
	}

}
